// --- 1. Database Backup ---
/* 
MongoDB Backup:
You should use the `mongodump` tool for backup.
Example: 
mongodump --uri="mongodb://your_username:your_password@host:port/database_name" --out=backup_folder
*/

// --- 2. Database Restore ---
/* 
MongoDB Restore:
Use the `mongorestore` tool to restore the database from a backup.
Example:
mongorestore --uri="mongodb://your_username:your_password@host:port" backup_folder
*/

// --- 3. Monitor Long-Running Queries ---

// Find queries that are running longer than 60 seconds
db.currentOp({ "secs_running": { $gt: 60 } });

// --- 4. Check Database Size ---
db.stats(); // Returns statistics about the current database, including size

// --- 5. Check Collection Sizes ---
db.getCollectionNames().forEach(function(collection) {
  var stats = db[collection].stats();
  print(collection + " - " + stats.size + " bytes");
});

// --- 6. Verify Schema Changes ---

// Example: Check if a specific field exists in documents (since MongoDB is schema-less)
db.your_collection.find({ "new_field": { $exists: true } });

// --- 7. Verify Data Integrity ---

// Example: Find documents with a missing field (potentially for integrity checks)
db.your_collection.find({ "required_field": { $exists: false } });

// --- 8. Schema Update (Add, Rename, Drop Fields) ---

// Example: Add a new field to all documents in a collection
db.your_collection.updateMany({}, { $set: { "new_field": "default_value" } });

// Example: Rename a field in a collection (requires MongoDB 4.2+)
db.your_collection.updateMany({}, { $rename: { "old_field_name": "new_field_name" } });

// Example: Remove a field from all documents in a collection
db.your_collection.updateMany({}, { $unset: { "field_to_remove": "" } });

// --- 9. Insert Test Data ---

// Insert some test documents into a collection
db.your_collection.insertMany([
  { "name": "Test1", "value": "TestData1" },
  { "name": "Test2", "value": "TestData2" }
]);

// --- 10. Rollback
