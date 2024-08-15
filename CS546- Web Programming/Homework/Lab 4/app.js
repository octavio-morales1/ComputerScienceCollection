import {dbConnection, closeConnection} from './config/mongoConnection.js';
import * as prods from './data/products.js';

const base = await dbConnection();
await base.dropDatabase();

/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/

try{
    const prod1 = await prods.create(
        //first product that actually works
        "NVIDIA - GeForce RTX 4080 16GB GDDR6X Graphics Card", 
        "Supercharge your PC with the NVIDIA® GeForce RTX™ 4080 SUPER and RTX 4080. Bring your games and creative projects to life with accelerated ray tracing and AI-powered graphics. They're powered by the ultra-efficient NVIDIA Ada Lovelace architecture and 16GB of super-fast G6X memory.", 
        "900-1G136-2560-000", 
        1399.99, 
        "NVIDIA", 
        "http://www.nvidia.com", 
        ["NVIDIA", "Graphics Card", "GeForce", "RTX", "4080", "Graphics"], 
        ["Electronics", "Graphics Cards", "Computers", "Graphics Processing Unit"], 
        "11/20/2022", 
        true
    );
    console.log(prod1);
    const prod2 = await prods.create(
        //second product that actually works
        "ZOTAC GAMING GeForce RTX 4070 SUPER Trinity OC Black Edition 12GB GDDR6X", 
        "A balanced take on the signature aerodynamic-inspired design, the ZOTAC GAMING GeForce RTX 4070 SUPER Trinity OC Black Edition 12GB GDDR6X utilizes the state-of-the-art NVIDIA Ada Lovelace architecture to give gamers cutting-edge features such as DLSS 3.5 and real-time raytracing. Complete with the advanced cooling design derived from flagship models, the Trinity Black Edition packs the punch to deliver blistering FPS in the latest titles.", 
        "ZT-D40720D-10P", 
        619.99, 
        "ZOTAC", 
        "http://www.zotac.com", 
        ["ZOTAC", "Graphics Card", "GeForce", "RTX", "4070", "Graphics", "Trinity"], 
        ["Electronics", "Graphics Cards", "Computers", "Graphics Processing Unit"], 
        "01/16/2024", 
        false
    );

    console.log("When getAll is called:");
    console.log(await prods.getAll());
    const product3 = await prods.create(
        //third product that actually works
        "SAPPHIRE NITRO+ AMD Radeon RX 7900 GRE", 
        "SAPPHIRE Technology announces the latest SAPPHIRE NITRO+ AMD Radeon™ RX 7900 GRE graphics card, crafted on the groundbreaking AMD RDNA™ 3 architecture designed to provide incredible performance to gamers and creators alike. Premium components and complex cooling designs enveloped in a Cold Rolled Steel Frame ensure a smooth, cool, and quiet gaming experience.", 
        "11322-01-40G", 
         1059.99, 
         "SAPPHIRE", 
         "http://www.sapphiretech.com", 
        ["SAPPHIRE", "NITRO", "AMD", "Radeon", "7900", "Graphics", "Graphics Card"],
          ["Electronics", "Graphics Cards", "Computers", "Graphics Processing Unit"], 
         "02/27/2024", 
         false
    );
    console.log(product3);
    const temp= prod1._id;

    console.log("When rename is called:");
    console.log(await prods.rename(temp, "GeForce RTX 4080 16GB GDDR6X Graphics Card"));
    await prods.remove(prod2._id);
    console.log("When removed is called:");
    console.log(prod2._id);
    console.log("When getAll is called *again*:");
    console.log(await prods.getAll());
  } 
catch (e){
    throw e;
}

console.log(" ")
console.log("Start of errors:");
//part for errors
try {
    await prods.create(
        //first product that actually works
        "NVIDIA - GeForce RTX 4080 16GB GDDR6X Graphics Card", 
        "Supercharge your PC with the NVIDIA® GeForce RTX™ 4080 SUPER and RTX 4080. Bring your games and creative projects to life with accelerated ray tracing and AI-powered graphics. They're powered by the ultra-efficient NVIDIA Ada Lovelace architecture and 16GB of super-fast G6X memory.", 
        "900-1G136-2560-000", 
        "ThisIsABadParameter", 
        "NVIDIA", 
        "ThisIsABadParameterhttp://www.nvidia.com", 
        ["NVIDIA", "Graphics Card", "GeForce", "RTX", "4080", "Graphics"], 
        ["Electronics", "Graphics Cards", "Computers", "Graphics Processing Unit"], 
        "11/20/2022", 
        "ThisIsABadParameter"
    );
}
catch(e) {
    console.error(e);
}

try{
    await prods.remove("ThisIsAnInvalidID");
}
catch(e) {
    console.error(e);
}

try{
    await prods.rename("ThisIsAnInvalidID", "NotARealTest");
}
catch(e) {
    console.error(e);
}

try{
    await prods.get("ThisIsAnInvalidID");
}
catch(e) {
    console.error(e);
}


await closeConnection();
