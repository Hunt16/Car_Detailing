import frappe


def execute():
    make_service_item()


def make_service_item():
    try:
        item_code = "OutSourced Service"
        if not frappe.db.exists("Item", item_code):
            item = frappe.new_doc("Item")
            item.item_code = item_code
            item.item_name = "OutSourced Service"
            item.item_group = "Services"
            item.is_stock_item = 0
            item.is_sales_item = 1
            item.is_purchase_item = 0
            item.save(ignore_permissions=True)
            frappe.db.set_value("Car Detailing Settings", "Car Detailing Settings", "service_item", item.name)
            frappe.db.commit()

            print("OutSourced Service created successfully")
    except Exception as e:
        print("Error while creating OutSourced Service")
        frappe.log_error(frappe.get_traceback(), "Error while creating OutSourced Service")
        frappe.db.rollback()