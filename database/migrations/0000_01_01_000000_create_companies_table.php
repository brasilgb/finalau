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
        Schema::create('companies', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary()->index();
            $table->foreignId('organization_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('companyname', 50);
            $table->string('cnpj', 50);
            $table->string('subnumber', 50);
            $table->string('subname', 50);
            $table->string('cep', 20);
            $table->string('state', 4);
            $table->string('city', 50);
            $table->string('district', 50)->nullable();
            $table->string('street', 50)->nullable();
            $table->integer('number')->nullable();
            $table->string('complement')->nullable();
            $table->string('telephone', 20);
            $table->boolean('status');
            $table->string('whatsapp', 20)->nullable();
            $table->text('observation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
