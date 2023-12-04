-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "middle_name" VARCHAR(45),
    "user" VARCHAR(45) NOT NULL,
    "password" VARCHAR(80) NOT NULL,
    "id_profile" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id_profile" SERIAL NOT NULL,
    "name" VARCHAR(45) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id_profile")
);

-- CreateTable
CREATE TABLE "Client" (
    "client" SERIAL NOT NULL,
    "identification_type" INTEGER,
    "identification" VARCHAR(100),
    "social_reason" VARCHAR(100),
    "register_date" DATE DEFAULT CURRENT_TIMESTAMP,
    "state" VARCHAR(1) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("client")
);

-- CreateTable
CREATE TABLE "Identification_Type" (
    "identification_type" SERIAL NOT NULL,
    "abreviature" VARCHAR(3) NOT NULL,
    "description" VARCHAR(100),

    CONSTRAINT "Identification_Type_pkey" PRIMARY KEY ("identification_type")
);

-- CreateTable
CREATE TABLE "Recipes" (
    "consecutive" SERIAL NOT NULL,
    "client" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("consecutive")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "state" VARCHAR(45) NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe_Details" (
    "consecutive" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "Recipe_Details_pkey" PRIMARY KEY ("consecutive","id_product")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "Profile"("id_profile") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_identification_type_fkey" FOREIGN KEY ("identification_type") REFERENCES "Identification_Type"("identification_type") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_client_fkey" FOREIGN KEY ("client") REFERENCES "Client"("client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Details" ADD CONSTRAINT "Recipe_Details_consecutive_fkey" FOREIGN KEY ("consecutive") REFERENCES "Recipes"("consecutive") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Details" ADD CONSTRAINT "Recipe_Details_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
