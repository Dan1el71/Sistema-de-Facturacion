-- CreateTable
CREATE TABLE "User" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "middle_name" TEXT,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_profile" INTEGER NOT NULL,
    CONSTRAINT "User_id_profile_fkey" FOREIGN KEY ("id_profile") REFERENCES "Profile" ("id_profile") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id_profile" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "client" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "identification_type" INTEGER,
    "identification" TEXT,
    "social_reason" TEXT,
    "register_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL,
    CONSTRAINT "Client_identification_type_fkey" FOREIGN KEY ("identification_type") REFERENCES "Identification_Type" ("identification_type") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Identification_Type" (
    "identification_type" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "abreviature" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Invoice" (
    "consecutive" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Invoice_client_fkey" FOREIGN KEY ("client") REFERENCES "Client" ("client") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "unit_price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "InvoiceDetails" (
    "consecutive" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,

    PRIMARY KEY ("consecutive", "id_product"),
    CONSTRAINT "InvoiceDetails_consecutive_fkey" FOREIGN KEY ("consecutive") REFERENCES "Invoice" ("consecutive") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InvoiceDetails_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
