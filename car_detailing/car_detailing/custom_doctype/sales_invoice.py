import frappe
from erpnext.controllers.accounts_controller import get_taxes_and_charges

def validate(self,method):
    
    if self.get("taxes_and_charges") and not self.get("taxes"):
        taxes = get_taxes_and_charges("Sales Taxes and Charges Template", self.taxes_and_charges)
        for tax in taxes:
            self.append("taxes", tax)
            self.calculate_taxes_and_totals()
    
    service_item = frappe.db.get_single_value("Car Detailing Settings", "service_item")
    for item in self.items:
        if item.item_code == service_item:
            continue

        # Check if a matching Item Default exists
        exists = frappe.db.exists("Companies",{"parent": item.item_code,"company": self.company})

        if not exists:
            frappe.throw(f"This Item <b>{item.item_code}</b> Does Not Belong To This Company:<b>{self.company}</b>")

