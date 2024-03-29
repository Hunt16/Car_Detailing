import frappe
from erpnext.controllers.accounts_controller import get_taxes_and_charges

def validate(self,method):
    
    if self.get("taxes_and_charges") and not self.get("taxes"):
        taxes = get_taxes_and_charges("Sales Taxes and Charges Template", self.taxes_and_charges)
        for tax in taxes:
            self.append("taxes", tax)
            self.calculate_taxes_and_totals()
    
    for item in self.items:
        company = frappe.db.get_value("Item",{"name": item.item_code}, "company")
        if not company:
            frappe.msgprint(f"Not Found Company For This Item {item.item_code}")
        
        if self.company != company:
            frappe.throw(f"This Item <b>{item.item_code}</b> Does Not Belongs To This Company:<b>{self.company}</b>")
            