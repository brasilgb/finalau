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
        Schema::create('totals', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary()->index();
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('total_cnpj');
            $table->string('total_datatu');
            $table->string('total_filial');
            $table->string('total_valdev');
            $table->string('total_valven');
            $table->string('total_margem');
            $table->string('total_permet');
            $table->string('total_projec');
            $table->string('total_valjur');
            $table->string('total_perjur');
            $table->string('total_valina');
            $table->string('total_perina');
            $table->string('total_valest');
            $table->string('total_meta');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('totals');
    }
};
