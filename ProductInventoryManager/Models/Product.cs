using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductInventoryManager.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; } = null!;

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Category { get; set; } = null!;

        // Empty constructor allows the framework to process requests safely
        public Product() { }
    }
}