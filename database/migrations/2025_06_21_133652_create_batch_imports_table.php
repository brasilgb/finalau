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
        Schema::create('batch_imports', function (Blueprint $table) {
            $table->id();
            $table->string('type')->comment('Tipo da importação (ex: "products", "users")');
            $table->string('status')->default('pending')->comment('pending, processing, completed, failed');
            $table->unsignedBigInteger('organization_id')->nullable()->comment('ID da organização, se aplicável');
            $table->unsignedBigInteger('company_id')->nullable()->comment('ID da empresa, se aplicável');
            $table->integer('total_records')->nullable();
            $table->integer('processed_records')->default(0);
            $table->integer('successful_records')->default(0);
            $table->integer('failed_records')->default(0);
            $table->text('notes')->nullable()->comment('Notas gerais sobre a importação');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_imports');
    }
};
