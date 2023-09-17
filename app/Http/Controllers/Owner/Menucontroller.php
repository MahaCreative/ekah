<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\DataMenu;
use App\Models\Kategori;
use Illuminate\Http\Request;

class Menucontroller extends Controller
{
    public function index(Request $request){
        $count = DataMenu::count();
        $countKategori = Kategori::count();
        $kategori = Kategori::latest()->get();
        $menu = DataMenu::with('kategori')->latest()->get();
        return inertia('Owner/DataMenu/DataMenu', compact('count', 'countKategori', 'kategori', 'menu'));
    }

    public function store(Request $request){
        $request->validate([
            'nama_menu' => 'required|unique:data_menus,nama_menu',
            'kategori_id' => 'required',
            'foto' => 'required|mimes:png,jpg, jpeg',
            'harga' => 'required',
            'status' => 'required'
        ]);
        $url = $request->file('foto') ? $request->file('foto')->store('menu') : 'storage/image/default_image.jpg';
        $harga = preg_replace('/[^0-9]/', '', $request->harga);
        $menu = DataMenu::create([
            'nama_menu' => $request->nama_menu,
            'kategori_id' => $request->kategori_id,
            'harga' => $harga,
            'foto' => $url,
            'status' => $request->status,
        ]);
    }

    public function update(Request $request){
        // dd($request->all());
        $menu = DataMenu::findOrFail($request->data['id']);
        $url = $request->file('foto') ? $request->file('foto')->store('menu') : $menu->foto;

        $harga = preg_replace('/[^0-9]/', '', $request->data['harga']);
        $menu->update([
            'nama_menu' => $request->data['nama_menu'],
            'kategori_id' => $request->data['kategori_id'],
            'harga' => $harga,
            'foto' => $url,
            'status' => $request->data['status'],
        ]);
        return redirect()->back();
    }

    public function delete(Request $request){
        $menu = DataMenu::findOrFail($request->id);
        $menu->delete();
        return redirect()->back();
    }
}