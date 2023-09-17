<?php

namespace App\Http\Controllers\Kasir;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KasirDashboardController extends Controller
{

    public function index(Request $request)
    {

        return inertia('Kasir/Dashboard/Dashboard');
    }
}