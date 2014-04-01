var res = [];
var x = [];
var next = [];
var selectEntidad;
var selectResultado;
var selectDominio;
var selectResultado;
var ent;
var dom;
var a;
var anio;
var dominio;


function llenar(api,a) {
    selectEntidad = document.getElementById("entidad");
    selectResultado = document.getElementById("anio");
    selectDominio = document.getElementById("dominio");
    ent = "\'" + selectEntidad.options[selectEntidad.selectedIndex].value + "\'";
    dom = selectDominio.options[selectDominio.selectedIndex].text;

    $.ajax({
        type: "GET",
        url: 'http://datos.codeandomexico.org/api/action/datastore_search_sql',
        data: "sql=SELECT \""+a+"\" FROM "+api+" WHERE \"Entidad\" LIKE " + ent,
        success: function(response, status, xhr) {
            var recordss = JSON.stringify(response.result.records);
            var objo = JSON.parse(recordss);
            $.each(objo, function() {
                next.push(this[a]);
            });
            for (var i = 1; i < next.length + 1; i++) {
                selectResultado.options[i] = new Option(next[i - 1]);
            }
        }
    });
    next = new Array();

}

function getData(api,an)
{
    selectEntidad = document.getElementById("entidad");
    selectResultado = document.getElementById("anio");
    selectDominio = document.getElementById("dominio");
    ent = "\'" + selectEntidad.options[selectEntidad.selectedIndex].value + "\'";
    dom = selectDominio.options[selectDominio.selectedIndex].text;
    a = "\'" + selectResultado.options[selectResultado.selectedIndex].value + "\'";
    anio = selectResultado.options[selectResultado.selectedIndex].value;
    dominio = "\"" + dom + "\"";
	
    var data=new Array();
    $.ajax({
        type: "GET",
        url: 'http://datos.codeandomexico.org/api/action/datastore_search_sql',
        data: (anio !== 'all' ? "sql=SELECT " + dominio +" \""+an+"\" FROM " + api +" WHERE \"Entidad\" LIKE " + ent + " AND \""+an+"\" = " + a : "sql=SELECT " + dominio + " \""+an+"\" FROM" + api + " WHERE \"Entidad\" LIKE " + ent),
        success: function(response, status, xhr) {
            var objo = response.result.records;
            $.each(objo, function() {
                data.push(parseFloat( this[an].replace(",",".")));
				console.log(data[1]);
            });
				drawsBarra(anio === 'all'?next:anio,data);
			
        },
        error: function(xml) {
            alert("error");
        }
		
		
    });
}

function drawsBarra(labels, data) {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estado '
        },
        subtitle: {
            text: '  '
        },
        xAxis: {
            categories: labels
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
		 
      
        tooltip: {
            headerFormat: '<span style="font-size:16px; align:center;">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
			backgroundColor:'#58D3F7',
            shared: true,
            useHTML: true,
			style: {
                padding: 10,
                fontWeight: 'bold'
				
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
                name: 'Estado',
                data: data,
				color:"#F7D358"

            }]
    });




}

