// Copyright (c) 2022, tailorraj and contributors
// For license information, please see license.txt

frappe.ui.form.on('Job Master', {
	refresh(frm) {

		if(frm.is_new()){
			frappe.call({
				method: 'car_detailing.car_detailing.doctype.job_master.job_master.get_types_of_packages',
				callback: (r) => {
					console.log(r.message)
					if(r.message && frm.doc.types_of_packages.length === 0){
						r.message.forEach(function(row){
							frm.add_child('types_of_packages', {
								item: row.item_code,
								rate: row.standard_rate
							});
							
							frm.refresh_field('types_of_packages');
						})
					}
				},
			})
	
			frappe.call({
				method: 'car_detailing.car_detailing.doctype.job_master.job_master.get_additional_coating',
				callback: (r) => {
					console.log(r.message)
					if(r.message && frm.doc.additional_coating.length === 0){
						r.message.forEach(function(row){
							frm.add_child('additional_coating', {
								item: row.item_code,
								rate: row.standard_rate
							});
							
							frm.refresh_field('additional_coating');
						})
					}
				},
			})
	
			frappe.call({
				method: 'car_detailing.car_detailing.doctype.job_master.job_master.get_leather_painting',
				callback: (r) => {
					if(r.message && frm.doc.leather_painting.length === 0){
						r.message.forEach(function(row){
							frm.add_child('leather_painting', {
								item: row.item_code,
								rate: row.standard_rate
							});
							
							frm.refresh_field('leather_painting');
						})
					}
				},
			})
		}


		
		// $(frm.fields_dict.html_21.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/convertible-car%20(1)(1).png'>")
		// $(frm.fields_dict.hello.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/coupe(1).jpg'>")
		// $(frm.fields_dict.test2.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/hatchback-car(1).jpg'>")
		// $(frm.fields_dict.test3.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/8526-8466dd65.png'>")
		// $(frm.fields_dict.test4.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/suv(1).jpg'>")
		// $(frm.fields_dict.test5.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/3003313-200(1).png'>")
		// $(frm.fields_dict.test6.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/2927084-200475867.png'>")
		// $(frm.fields_dict.test7.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/van(1).jpg'>")
		// $(frm.fields_dict.test8.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/PngItem_2803228(2).png'>")
		// $(frm.fields_dict.test9.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/yacht_1.jpg'>")
		// $(frm.fields_dict.test10.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/boat_1.jpg'>")
		// $(frm.fields_dict.test11.wrapper).html("<image src='https://mrsh.tncbahrain.com/files/jet_ski_1.jpg'>")

		$(frm.fields_dict.html_21.wrapper).html("<image src='https://mrsh.mohaseb.online/files/convertible-car.png'>")
		$(frm.fields_dict.hello.wrapper).html("<image src='https://mrsh.mohaseb.online/files/coupe.jpg'>")
		$(frm.fields_dict.test2.wrapper).html("<image src='https://mrsh.mohaseb.online/files/hatchback-car.jpg'>")
		$(frm.fields_dict.test3.wrapper).html("<image src='https://mrsh.mohaseb.online/files/sedan.png'>")
		$(frm.fields_dict.test4.wrapper).html("<image src='https://mrsh.mohaseb.online/files/suv.jpg'>")
		$(frm.fields_dict.test5.wrapper).html("<image src='https://mrsh.mohaseb.online/files/truck.png'>")
		$(frm.fields_dict.test6.wrapper).html("<image src='https://mrsh.mohaseb.online/files/minivan.png'>")
		$(frm.fields_dict.test7.wrapper).html("<image src='https://mrsh.mohaseb.online/files/van.jpg'>")
		$(frm.fields_dict.test8.wrapper).html("<image src='https://mrsh.mohaseb.online/files/wagon.png'>")
		$(frm.fields_dict.test9.wrapper).html("<image src='https://mrsh.mohaseb.online/files/yacht.jpg'>")
		$(frm.fields_dict.test10.wrapper).html("<image src='https://mrsh.mohaseb.online/files/boat.jpg'>")
		$(frm.fields_dict.test11.wrapper).html("<image src='https://mrsh.mohaseb.online/files/jet_ski.jpg'>")

		
		frm.set_query("item", "types_of_packages", function(doc) {
			return { "filters" : [['is_type_of_packages','=',1]]}
		});
	
		frm.set_query("item", "additional_coating", function(doc) {
			return { "filters" : [['is_additional_coating','=',1]]}
		});
	
		frm.set_query("item", "leather_painting", function(doc) {
			return { "filters" : [['is_leather_coating','=',1]]}
		}); 
		
		frappe.ui.form.on("Job Master", {
			packages_amounts: function(frm) {
				update_amounts(frm);
			},
			outsourcing_amount: function(frm) {
				update_amounts(frm);
			},
			discount_amount: function(frm) {
				calculate_discount_percentage(frm);
				update_amounts(frm);
			},
			discount_percentage: function(frm) {
				calculate_discount_amount(frm);
				update_amounts(frm);
			}
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

		frappe.db.get_value('Sales Invoice', {'name': frm.doc.sales_invoice}, 'docstatus')
			.then(r => {
				let values = r.message;
				console.log(values.docstatus)
				if(values.docstatus<2){
					frm.set_df_property('sales_invoice', 'read_only', 1)
				}
				else{
					frm.set_df_property('sales_invoice', 'read_only', 0)
				}
			})
	
	},
	delivery_date:function(frm){
		frm.set_value("service_date",frm.doc.delivery_date)
		frm.refresh_field("service_date")
	},
	validate(frm){

		frm.set_value("service_date",frm.doc.delivery_date)
		frm.refresh_field("service_date")

		var total_packages_amount = 0;
		if(frm.doc.types_of_packages){
			frm.doc.types_of_packages.forEach(function(row){
				if(row.checkbox === 1){
					total_packages_amount += row.rate
				}
				
			})
			frm.set_value("total_packages_bhd",total_packages_amount)
			refresh_field("total_packages_bhd")
		}

		var total_painting_coating = 0;
		if(frm.doc.additional_coating){
			frm.doc.additional_coating.forEach(function(row){
				if(row.checkbox === 1){
					total_painting_coating += row.rate
				}
				
			})
			frm.set_value("total_paint_coating_bhd",total_painting_coating)
			refresh_field("total_paint_coating_bhd")
		}
		
		var total_leather_painting = 0;
		if(frm.doc.leather_painting){
			frm.doc.leather_painting.forEach(function(row){
				if(row.checkbox === 1){
					total_leather_painting += row.rate
				}
				
			})
			frm.set_value("total_leather_coating_bhd",total_leather_painting)
			refresh_field("total_leather_coating_bhd")
		}

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

function calculate_discount_amount(frm) {
    let total_before_discount = flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount);
    frm.set_value("discount_amount", total_before_discount * (flt(frm.doc.discount_percentage) / 100));
}

function calculate_discount_percentage(frm) {
    let total_before_discount = flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount);
    if (total_before_discount != 0) {
        frm.set_value("discount_percentage", (flt(frm.doc.discount_amount) / total_before_discount) * 100);
    }
}

function update_amounts(frm) {
    let total_before_discount = flt(frm.doc.packages_amounts) + flt(frm.doc.outsourcing_amount);
    let discount_amount = flt(frm.doc.discount_amount);
    let total_amount = total_before_discount - discount_amount;
    frm.set_value("total_amount", total_amount);

    let vat_amount = total_amount * 0.1;
    frm.set_value("vat_amount", vat_amount);

    let grand_total = total_amount + vat_amount;
    frm.set_value("grand_total", grand_total);
}