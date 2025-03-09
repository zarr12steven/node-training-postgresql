const { DataSource, EntitySchema } = require("typeorm")

const CreditPackage = new EntitySchema({
  name: "CreditPackage",
  tableName: "CREDIT_PACKAGE",
  columns: {
    id: {
      primary: true,      // 資料庫的主鍵
      type: "uuid",       // 資料庫的欄位型態
      generated: "uuid",  // 資料庫是否自動產生值
      nullable: false     // 資料庫的欄位是否可以為空值
    },
    name: {
      type: "varchar",    // 資料庫的欄位型態
      length: 50,         // 資料庫的欄位長度
      nullable: false,    // 資料庫的欄位是否可以為空值
      unique: true        // 資料庫的欄位是否唯一
    },
    credit_amount: {
      type: "integer",    // 資料庫的欄位型態
      nullable: false     // 資料庫的欄位是否可以為空值
    },
    price: {
      type: "numeric",    // 資料庫的欄位型態
      precision: 10,      // 資料庫的欄位精度，使用十進制
      scale: 2,           // 資料庫的欄位保留小數點到第二位數
      nullable: false     // 資料庫的欄位是否可以為空值
    },
    createdAt: {
      type: "timestamp",  // 資料庫的欄位型態
      createDate: true,   // 資料庫是否自動產生值
      name: "created_at", // 資料庫的欄位名稱
      nullable: false     // 資料庫的欄位是否可以為空值
    }
  }
})

const Skill = new EntitySchema({
  name: "Skill",      // getRepository 時，使用的名稱
  tableName: "SKILL", // 資料表名稱，一律都用大寫
  columns: {
    id: {
      primary: true,      // 資料庫的主鍵
      type: "uuid",       // 資料庫的欄位型態
      generated: "uuid",  // 資料庫是否自動產生值
      nullable: false     // 資料庫的欄位是否可以為空值
    },
    name: {
      type: "varchar",    // 資料庫的欄位型態
      length: 50,         // 資料庫的欄位長度
      nullable: false,    // 資料庫的欄位是否可以為空值
      unique: true        // 資料庫的欄位是否唯一
    },
    createdAt: {
      type: "timestamp",  // 資料庫的欄位型態
      createDate: true,   // 資料庫是否自動產生值
      name: "created_at", // 資料庫的欄位名稱
      nullable: false     // 資料庫的欄位是否可以為空值
    }
  }
})

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_DATABASE || "test",
  entities: [CreditPackage, Skill],
  synchronize: true
})


// 透過 entities 陣列將所有 EntitySchema 加入。

// 啟動時 TypeORM 會根據這些設定自動建立或更新表結構（若 synchronize: true）。

// 之後就能使用 AppDataSource.getRepository("CreditPackage") 或 AppDataSource.getRepository("Skill") 進行 CRUD。

module.exports = AppDataSource