<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\RecurringTransaction;
use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $day = Carbon::parse($request->query('date') ?? 'now');
        $transactions = Transaction::with('category:id,name,icon,color')
                                ->when($request->query('sort'), function($query) use($request){
                                    $query->orderBy('created_at', $request->query('sort'));
                                }, function($query){
                                    $query->orderBy('created_at', 'desc');
                                })
                                // ->paginate(20);
                                // dd($transactions->items());
                                ->limit(20)->get(['id', 'amount', 'description', 'type', 'recurring_transaction_id', 'category_id', 'created_at', 'updated_at'])->groupBy(function($item){
                                    return Carbon::parse($item->created_at)->timestamp;
                                })->sortKeysDesc();
        return $transactions;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|integer|between:1,100000',
            'description' => 'nullable|max:250',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $transaction = Transaction::make($data);
        $transaction->user_id = $request->user()->id;
        $transaction->save();
        return $transaction;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        $data = $request->validate([
            'amount' => 'required|integer|between:1,100000',
            'description' => 'nullable|max:250',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $transaction->fill($data);
        $transaction->save();
        return $transaction;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return $transaction;
    }

    public function getStatistics(Request $request){
        // // $transactions = Transaction::where('created_at', '>=' , Carbon::now()->subDays(4))->paginate(10);
        // // $transactions = Transaction::select('type', DB::raw('count(*) as total'))
        // // ->groupBy('type')->get();
        // dd(Carbon::parse('3rd week of march'));
        // dd(Carbon::parse('10 march')->isSameDay(Carbon::now()));
        // dd(Carbon::parse('monday'));
        // dd(Carbon::now()->setDays(11)->isSameDay(Carbon::now()));
        $request->validate([
            'type' => 'in:income,expense',
        ]);

        $month = Carbon::parse($request->query('month')) ?? Carbon::now();
        $monthAmount = Transaction::where([
            ['user_id', $request->user()->id],
            ['created_at', '>=', $month->copy()->startOfMonth()],
            ['created_at', '<=', $month->copy()->endOfMonth()],
        ])->when($request->query('type'), function($query) use ($request){
            $query->where('type', '=', $request->query('type'));
        })->sum('amount');
        if($monthAmount == 0 )
            return [];
        $transactions = Transaction::select('id', 'amount', 'category_id')->with('category:id,name')->where([
            ['user_id', $request->user()->id],
            ['created_at', '>=', $month->copy()->startOfMonth()],
            ['created_at', '<=', $month->copy()->endOfMonth()],
        ])->when($request->query('type'), function($query) use ($request){
            $query->where('type', '=', $request->query('type'));
        })->get()->groupBy('category.name');

        $categories = collect($transactions)->keys()->all();
        $response = [];
        foreach($categories as $category){
            $categoryAmount = 0;
            $transactions[$category]->each(function($item) use(&$categoryAmount){
                $categoryAmount += $item->amount;
            });
            $response[$category]['category_amount'] = $categoryAmount;
        }
        // $categories = collect($response);
        // $categories->sortBy(function($category){
        //     return $category['category_amount'];
        // });
        // $response = $categories;
        $response['total_amount'] = $monthAmount;
        return $response;
    }

    public function getByDate(Request $request, $date){
        $request['date'] = $date ?? null;
        $request->validate([
            'sort' => 'nullable|in:desc,asc',
            'date' => 'required|date'
        ]);
        $transactions = Transaction::with('category')
                                    ->when($date, function($query) use($date){
                                        $query->where([
                                            ['created_at', '>=', Carbon::parse($date)->copy()->startOfDay()],
                                            ['created_at', '<=', Carbon::parse($date)->copy()->endOfDay()],
                                        ]);
                                    })
                                    ->orderBy('created_at', $request->query('sort') ?? 'desc')
                                    ->simplePaginate(20);
        return $transactions;
    }
}
