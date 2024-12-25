import frappe


def execute():
    create_service_item()


def create_service_item():
    try:
        item_code = "Consulting Service Item"
        if not frappe.db.exists("Item", item_code):
            item = frappe.new_doc("Item")
            item.item_code = item_code
            item.item_name = "Consulting Service Item"
            item.item_group = "Services"
            item.is_stock_item = 0
            item.is_sales_item = 1
            item.is_purchase_item = 0
            item.save(ignore_permissions=True)
            frappe.db.commit()
            print("Consulting Service Item created successfully")
    except Exception as e:
        print("Error while creating Consulting Service Item")
        frappe.log_error(frappe.get_traceback(), "Error while creating Consulting Service Item")
        frappe.db.rollback()
