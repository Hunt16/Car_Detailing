# Copyright (c) 2022, tailorraj and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class JobMaster(Document):
	pass

@frappe.whitelist()
def create_sales_invoice(self):
	self = json.loads(self)
	try:
		sales_doc = frappe.get_doc({
			'doctype':'Sales Invoice',
			'customer':self['customer'],
			'posting_date':self['date_of_receive'],
			'due_date':self['delivery_date'],
			'company':self['company']
		})

		for item in self['types_of_packages']:
			sales_package_item_doc ={
				'doctype':'Sales Invoice Item',
				'item_code':item['item'],
				'qty':'1',
				'rate':item['rate']
			}
			sales_doc.append('items',sales_package_item_doc)

		for item in self['additional_coating']:
			sales_coating_item_doc = {
				'doctype':'Sales Invoice Item',
				'item_code':item['item'],
				'qty':'1',
				'rate':item['rate']
			}
			sales_doc.append('items',sales_coating_item_doc)

		for item in self['leather_painting']:
			sales_painting_item_doc = {
				'doctype':'Sales Invoice Item',
				'item_code':item['item'],
				'qty':'1',
				'rate':item['rate']
			}
			sales_doc.append('items',sales_painting_item_doc)	

		so = sales_doc.insert(ignore_permissions = 1)
		frappe.db.set_value('Job Master',self['name'],'sales_invoice',so.name)
		frappe.msgprint("Sales Invoice No <b>{0}</b> Created Sucessfully".format(so.name))
	except:
		frappe.log_error(message=frappe.get_traceback(),title="Creation Of Sales Invoice From Job Master:")
		frappe.throw("Error occured while creating the Sales Invoice, Kindly check the logs")			