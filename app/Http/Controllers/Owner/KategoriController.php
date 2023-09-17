<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategoriController extends Controller
{
    public function index(Request $request){
        $count = Kategori::count();
        $kategori = Kategori::latest()->get();
        // dd($kategori);
        return inertia('Owner/DataKategori/DataKategori', compact('kategori', 'count'));
    }

    public function store(Request $request){
        // dd($request->all());
        $request->validate([
            'nama_kategori' => 'unique:kategoris,nama_kategori|required|min:6',
            'foto' => 'required|mimes:png,jpg,jpeg'
        ]);
        $url = $request->file('foto') ? $request->file('foto')->store('kategori') : 'storage/image/default_image.jpg';
        $kategori = Kategori::create([
            'nama_kategori' => $request->nama_kategori,
            'foto' => $url
        ]);
    }
    public function update(Request $request){
        $kategori = Kategori::findOrFail($request->data['id']);
        $url = $request->file('foto') ? $request->file('foto')->store('kategori') : $request->foto;
        $kategori->update([
            'nama_kategori' => $request->data['nama_kategori'],
            'foto' => $url
        ]);
    }
    public function delete(Request $request){

        $kategori = Kategori::findOrFail($request->id);
        $kategori->delete();
        return redirect()->back();
    }
}