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
		
	//	frm.set_query("item_name", "outsourcing_item", function(doc) {
     //           return { "filters" : [['item_group','=','Services']]}
       // });
       
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
     
	}



});
