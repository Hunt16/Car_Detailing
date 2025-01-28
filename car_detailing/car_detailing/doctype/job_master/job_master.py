# Copyright (c) 2022, tailorraj and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class JobMaster(Document):
	pass

@frappe.whitelist()
def get_types_of_packages():
	return frappe.db.sql("""select item_code, standard_rate from `tabItem` where is_type_of_packages = 1 ORDER BY custom_sequence""",as_dict=1)

@frappe.whitelist()
def get_additional_coating():
	return frappe.db.sql("""select item_code, standard_rate from `tabItem` where is_additional_coating = 1 ORDER BY custom_sequence""",as_dict=1)

@frappe.whitelist()
def get_leather_painting():
	return frappe.db.sql("""select item_code, standard_rate from `tabItem` where is_leather_coating = 1 ORDER BY custom_sequence""",as_dict=1)

@frappe.whitelist()
def create_sales_invoice(self):
	self = json.loads(self)
	tax_template = frappe.db.get_value("Sales Taxes and Charges Template",{"company":self['company'],'is_default':'1'},'name')
	try:
		sales_doc = frappe.get_doc({
			'doctype':'Sales Invoice',
			'customer':self['customer'],
			'posting_date':self['date_of_receive'],
			'due_date':self['delivery_date'],
			'company':self['company'],
			'taxes_and_charges':tax_template,
			'apply_discount_on':'Net Total',
			'additional_discount_percentage':self['discount_percentage'],
			'discount_amount':self['discount_amount']
		})

		for item in self['types_of_packages']:
			if item['checkbox'] == 1:
				sales_package_item_doc ={
					'doctype':'Sales Invoice Item',
					'item_code':item['item'],
					'qty':'1',
					'rate':item['rate']
				}
				sales_doc.append('items',sales_package_item_doc)

		for item in self['additional_coating']:
			if item['checkbox'] == 1:
				sales_coating_item_doc = {
					'doctype':'Sales Invoice Item',
					'item_code':item['item'],
					'qty':'1',
					'rate':item['rate']
				}
				sales_doc.append('items',sales_coating_item_doc)

		for item in self['leather_painting']:
			if item['checkbox'] == 1:
				sales_painting_item_doc = {
					'doctype':'Sales Invoice Item',
					'item_code':item['item'],
					'qty':'1',
					'rate':item['rate']
				}
				sales_doc.append('items',sales_painting_item_doc)	
		
		if self['outsourcing_amount']:
			service_item = frappe.db.get_single_value("Car Detailing Settings", "service_item")
			if not service_item:
				frappe.throw("Service Item Not Found, Kindly Set Service Item in Car Detailing Settings")
			sales_outsourcing_item_doc = {
				'doctype':'Sales Invoice Item',
				'item_code':service_item,
				'qty':'1',
				'rate':self['outsourcing_amount']
			}
			sales_doc.append('items',sales_outsourcing_item_doc)

		so = sales_doc.insert(ignore_permissions = 1)
		so.calculate_taxes_and_totals()
		frappe.db.set_value('Job Master',self['name'],'sales_invoice',so.name)
		frappe.msgprint("Sales Invoice No <b>{0}</b> Created Sucessfully".format(so.name))
	except:
		frappe.log_error(message=frappe.get_traceback(),title="Creation Of Sales Invoice From Job Master:")
		frappe.throw("Error occured while creating the Sales Invoice, Kindly check the logs")			