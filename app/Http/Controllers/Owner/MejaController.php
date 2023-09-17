<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\DataMeja;
use Illuminate\Http\Request;

class MejaController extends Controller
{
    public function index(){
        $count = DataMeja::count();
        $meja = DataMeja::latest()->get();
        return inertia('Owner/DataMeja/DataMeja', ['count' => $count, 'meja' => $meja]);
    }
    public function store(Request $request){
        $request->validate([
            'nama_meja' => 'required|unique:data_mejas,nama_meja',
            'foto' => 'required'
        ]);
        $url = $request->file('foto') ? $request->file('foto')->store('meja') : 'storage/image/default_image.jpg';
        $dataMeja = DataMeja::create([
            'nama_meja' => $request->nama_meja,
            'foto' => $url
        ]);
    }

    public function delete(Request $request){
        $data = DataMeja::findOrFail($request->id);
        $data->delete();
    }
}