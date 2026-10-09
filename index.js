const [, , method, route, ...args] = process.argv;
const [resource, id] = route.split("/");

const URL = "https://fakestoreapi.com";

const request = async (url, options = {}) => {
    const response = await fetch(url, options);

    if (!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

//Métodos:
try {
    if (method === "GET"){
        if (id) {
            console.log(`Obteniendo ${resource} con el ID: ${id}`); 
    
            const data = await request(`${URL}/${resource}/${id}`);
            console.log(data)
        } else {
            console.log(`Obteniendo todos los ${resource}`);
    
            const data = await request(`${URL}/${resource}`);
            console.log(data);
        }
    
    } else if (method === "POST"){
        // title price category
        console.log(`Creando un ${resource} con los datos: ${args.join(" ")}`);
    
        const [title, price, category] = args;
    
        if (!title || !price || !category){
            throw new Error(`Se requiere un nombre, precio y categoría para crear en ${resource}`);
        }
    
        const data = await request(`${URL}/${resource}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, price, category}),
        });
        console.log(data);
    
    } else if (method === "DELETE"){
        if (!id) {
            throw new Error(`Se requiere un ID válido para eliminar en ${resource}`);
        }
    
        console.log(`Eliminando el ${resource} con ID: ${id}`);
        const data = await request(`${URL}/${resource}/${id}`, { method: "DELETE" });
        console.log(data);
    
    } else {
        console.log(`${method} no válido`);
    }
} catch (error){
    console.log(`Ha ocurrido un error: ${error.message}`);
}