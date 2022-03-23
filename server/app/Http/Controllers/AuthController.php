<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required|min:5|max:100',
            'email' => 'required|email|unique:users|min:5|max:200',
            'password' => 'required|min:5|max:100',
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $user->save();
        return $user;
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        if($user->tokens()->count() == 5)
            $user->tokens()->first()->delete();
        return ['token' => $user->createToken($request->device_name)->plainTextToken];
    }

    public function registerGuest(Request $request){
        $data = [
            'guest_token' => Str::orderedUuid()->getHex()->toString() . '' . Str::lower(Str::random(36))
        ];
        $user = User::create($data);
        $user->save();
        $user['guest_token'] = $data['guest_token'];
        return $user;
    }
}
