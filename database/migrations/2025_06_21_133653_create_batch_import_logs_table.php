<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('batch_import_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('batch_import_id')->constrained('batch_imports')->onDelete('cascade');
            $table->string('record_identifier')->nullable()->comment('Um identificador único do registro no lote (ex: CPF, SKU)');
            $table->string('status')->comment('success, failed');
            $table->json('data_processed')->nullable()->comment('Dados brutos do registro processado');
            $table->text('message')->nullable()->comment('Mensagem de sucesso ou erro');
            $table->json('errors')->nullable()->comment('Detalhes de erros de validação, se houver');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_import_logs');
    }
};
