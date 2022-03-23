<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class EnsureUserIsGuest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, String $type = null)
    {
        $guestToken = $request->query('guest_token');
        if($guestToken && ($type === null || $type === 'guest')){
            $user = User::where('guest_token', $guestToken)->first();
            if(!$user)
                return response(['message' => 'unauthorized'], 401);
            $request->merge(['user', $user]);
            $request->setUserResolver(function () use ($user) {
                return $user;
            });
            return $next($request);
        }
        return response(['message' => 'unauthorized'], 401);
    }
}
