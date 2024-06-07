/*https://www.themealdb.com/api/json/v1/1/filter.php?c=NombreCategoria
utulizar para la función ver más*/

function verMas(NombreCategoria) {
    var categoriaId = `detalle-${NombreCategoria}`;
    //Aqui es solo para habilitar o deshabilitar ls visibilidad de la sigueinte fila
    $(`#${categoriaId}`).toggle();
    $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${NombreCategoria}`, function (data) {

        //Aqui se eliminará los elementos de este item que antes se hayan cargado evitando que se comiencen a repetir
        $(`#tabla-detalle-${NombreCategoria}`).empty();
        
        $.each(data.meals, function (i, meal) {
            let htmlFila = `
                <tr>
                    <td>${meal.idMeal}</td>
                    <td>${meal.strMeal}</td>
                    <td><img src="${meal.strMealThumb}" style="max-width: 100px;"></td>
                </tr>`;
            $(`#tabla-detalle-${NombreCategoria}`).append(htmlFila);
        });
    });
}

'++'

$(document).ready(function () {

    // Función que permite cargar el API de categorías de comidas

    /*mostrando las categorías de comida*/
    $("#btn-cargar").on("click", function () {
        console.log("cargando informacion...");
        $("#spinner").html("");
        
        let htmlSpinner = '<div class="lds-circle"><div></div></div>';
        $("#spinner").append(htmlSpinner);

        $.get("https://www.themealdb.com/api/json/v1/1/categories.php", function (data) {
            $(`#tabla`).empty();
    
            $(`#tabla`).toggle();
    
                $.each(data.categories, function (i, item) {
                //propongo usar ${} en vez de '++' encuentro que es una practica mas ordenada y visiblemente mas clara
                    let htmlFila = `
                        <tr id="fila-${item.idCategory}">
                            <th scope="row">${item.idCategory}</th>
                            <td>${item.strCategory}</td>
                            <td>${item.strCategoryDescription}</td>
                            <td><img src="${item.strCategoryThumb}" style="max-width: 150px;"></td>
                            <td><button onclick="verMas('${item.strCategory}')" class="btn btn-dark"><i class="fa-solid fa-plus"></i> Ver más</button></td>
                        </tr>
                        <tr class="segunda-tabla" id="detalle-${item.strCategory}" style="display:none;">
                            <td colspan="4">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr style = "color: rgb(255, 255, 255);">
                                            <th>ID </th>
                                            <th>Platillo </th>
                                            <th>Imagen </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabla-detalle-${item.strCategory}" style = "color: rgb(255, 255, 255);"></tbody>
                                </table>
                            </td>
                        </tr>`;
                    $("#tabla").append(htmlFila);
                });
                $("#spinner").html("");
            });
    });
});
