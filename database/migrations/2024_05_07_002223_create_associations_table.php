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
        Schema::create('associations', function (Blueprint $table) {
            $table->string('id')->primary()->index();
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('assoc_cnpj');
            $table->string('assoc_filial');
            $table->string('assoc_datmvt');
            $table->string('assoc_ass');
            $table->string('assoc_desass');
            $table->string('assoc_valdev');
            $table->string('assoc_valven');
            $table->string('assoc_margem');
            $table->string('assoc_repres');
            $table->string('assoc_metdia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('associations');
    }
};
