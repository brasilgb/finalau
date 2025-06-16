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
        Schema::create('sales', function (Blueprint $table) {
            $table->string('id')->primary()->index();
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('resumo_cnpj');
            $table->string('resumo_codfil');
            $table->string('resumo_desfil');
            $table->string('resumo_datmvt');
            $table->string('resumo_yearmonth');
            $table->string('resumo_valdev');
            $table->string('resumo_valven');
            $table->string('resumo_margem');
            $table->string('resumo_presen');
            $table->string('resumo_metdia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};