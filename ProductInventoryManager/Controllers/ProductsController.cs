using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ProductInventoryManager.Models;

namespace ProductInventoryManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMongoCollection<Product> _productsCollection;

        public ProductsController(IMongoDatabase database)
        {
            _productsCollection = database.GetCollection<Product>("Products");
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get() =>
            await _productsCollection.Find(_ => true).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Post(Product newProduct)
        {
            // Clear out empty string IDs so MongoDB generates its own ObjectId correctly
            if (string.IsNullOrEmpty(newProduct.Id))
            {
                newProduct.Id = null;
            }
            
            await _productsCollection.InsertOneAsync(newProduct);
            return CreatedAtAction(nameof(Get), new { id = newProduct.Id }, newProduct);
        }
    }
}