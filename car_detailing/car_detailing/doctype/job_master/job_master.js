// Copyright (c) 2022, tailorraj and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Job Master', {
// 	// refresh: function(frm) {

// 	// }
// });
frappe.ui.form.on('Job Master', {
	refresh(frm) {
		$(frm.fields_dict.html_21.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/convertible-car%20(1)(1).png'>")
		$(frm.fields_dict.hello.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/coupe(1).jpg'>")
		$(frm.fields_dict.test2.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/hatchback-car(1).jpg'>")
		$(frm.fields_dict.test3.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/8526-8466dd65.png'>")
		$(frm.fields_dict.test4.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/suv(1).jpg'>")
		$(frm.fields_dict.test5.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/3003313-200(1).png'>")
		$(frm.fields_dict.test6.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/2927084-200475867.png'>")
		$(frm.fields_dict.test7.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/van(1).jpg'>")
		$(frm.fields_dict.test8.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/PngItem_2803228(2).png'>")
		
		  frm.set_query("item", "types_of_packages", function(doc) {
               return { "filters" : [['is_type_of_packages','=',1]]}
       });
    
      frm.set_query("item", "additional_coating", function(doc) {
        return { "filters" : [['is_additional_coating','=',1]]}
      });
    
      frm.set_query("item", "leather_painting", function(doc) {
        return { "filters" : [['is_leather_coating','=',1]]}
      });  
       
       frappe.ui.form.on("Job Master", "packages_amounts", function(frm) {
         frm.set_value("total_amount", flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount)-flt(frm.doc.discount_amount));
         frm.set_value("vat_amount", (flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount)-flt(frm.doc.discount_amount))*flt(0.1));
         frm.set_value("grand_total", flt(frm.doc.vat_amount) + flt(frm.doc.total_amount));
     });
     
       frappe.ui.form.on("Job Master", "outsourcing_amount", function(frm) {
         frm.set_value("total_amount", flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount)-flt(frm.doc.discount_amount));
         frm.set_value("vat_amount", (flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount)-flt(frm.doc.discount_amount))*flt(0.1));
         frm.set_value("grand_total", flt(frm.doc.vat_amount) + flt(frm.doc.total_amount));
     });
     
     frappe.ui.form.on("Job Master", "discount_amount", function(frm) {
         frm.set_value("total_amount", flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount)-flt(frm.doc.discount_amount));
         frm.set_value("vat_amount", (flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount)-flt(frm.doc.discount_amount))*flt(0.1));
         frm.set_value("grand_total", flt(frm.doc.vat_amount) + flt(frm.doc.total_amount));
     });

     if(!frm.doc.sales_invoice){
        frm.add_custom_button(__('Create Sales Invoice'), function(){
            frappe.call({
                method: 'car_detailing.car_detailing.doctype.job_master.job_master.create_sales_invoice',
                args: {
                    'self': frm.doc
                },
                
                // freeze the screen until the request is completed
                freeze: true,
                callback: (r) => {
                    frm.reload_doc();
                },
            })
        });
     }
     
     
	},
  validate(frm){
      var total_packages_amount = 0;
      frm.doc.types_of_packages.forEach(function(row){
          total_packages_amount += row.rate
      })
      frm.set_value("total_packages_bhd",total_packages_amount)
      refresh_field("total_packages_bhd")

      var total_painting_coating = 0;
      frm.doc.additional_coating.forEach(function(row){
        total_painting_coating += row.rate
      })
      frm.set_value("total_paint_coating_bhd",total_painting_coating)
      refresh_field("total_paint_coating_bhd")

      var total_leather_painting = 0;
      frm.doc.leather_painting.forEach(function(row){
        total_leather_painting += row.rate
      })
      frm.set_value("total_leather_coating_bhd",total_leather_painting)
      refresh_field("total_leather_coating_bhd")

      frm.set_value("packages_amounts",flt(frm.doc.total_packages_bhd)+flt(frm.doc.total_paint_coating_bhd)+flt(frm.doc.total_leather_coating_bhd))
      refresh_field("packages_amounts")

  }


});

frappe.ui.form.on('Types Of Packages', {
  item:function(frm,cdt,cdn){
    var row = locals[cdt][cdn]
    frappe.model.set_value(cdt,cdn,"checkbox",1)
    refresh_field("types_of_packages");
  }
})

frappe.ui.form.on('Leather Painting', {
  item:function(frm,cdt,cdn){
    var row = locals[cdt][cdn]
    frappe.model.set_value(cdt,cdn,"checkbox",1)
    refresh_field("leather_painting");
  }
})

frappe.ui.form.on('Additional Coating', {
  item:function(frm,cdt,cdn){
    var row = locals[cdt][cdn]
    frappe.model.set_value(cdt,cdn,"checkbox",1)
    refresh_field("additional_coating");
  }
})
