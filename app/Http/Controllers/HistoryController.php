<?php
namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HistoryController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'city' => 'required|string',
            'temperature' => 'nullable|numeric',
            'condition' => 'nullable|string',
            'humidity' => 'nullable|numeric',
            'wind_speed' => 'nullable|numeric',
            'visibility' => 'nullable|numeric',
        ]);

        try {
            $history = History::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Previsão salva com sucesso!',
                'data' => $history
            ]);
        } catch (\Exception $e) {
            \Log::error('Erro ao salvar previsão: ', ['exception' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao salvar previsão.',
            ], 500);
        }
    }

    public function index()
    {
        try {
            $histories = History::all();

            return response()->json($histories, Response::HTTP_OK);
        } catch (\Exception $e) {
            \Log::error('Erro ao buscar histórico: ', ['exception' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar histórico.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

