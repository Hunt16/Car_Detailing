import frappe
from erpnext.controllers.accounts_controller import get_taxes_and_charges

def before_save(self,method):
    
    if self.get("taxes_and_charges") and not self.get("taxes"):
        taxes = get_taxes_and_charges("Sales Taxes and Charges Template", self.taxes_and_charges)
        for tax in taxes:
            self.append("taxes", tax)
            self.calculate_taxes_and_totals()