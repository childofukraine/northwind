# Northwind API
## API endpoints:
#
### [GET] /customers - will show a list of customers (limited by 20)
### query params: page=1 (numbers from 1)
#
### [GET] /employees - will show a list of employees
### query params: page=1 (numbers from 1)
#
### [GET] /orders - will show a list of orders
### query params: page=1 (numbers from 1)
#
### [GET] /products - will show a list of products
### query params: page=1 (numbers from 1)
#
### [GET] /suppliers - will show a list of suppliers
### query params: page=1 (numbers from 1)
#
### [GET] /search-products/${keyword}
### body: none
### - for search in products table by product name
#
### [GET] /search-customers/${keyword}
### body: none
### - for search in customers table by (company name or contact name or contact title or company address)
#
### [GET] /customers/${customerId} - will show information about customer by customer_id
### body: none
#
### [GET] /employees/${employeeId} - will show information about employee by employee_id
### body: none
#
### [GET] /suppliers/${supplierId} - will show information about supplier by supplier_id
### body: none
#
### [GET] /products/${productId} - will show information about product by product_id
### body: none
#
### [GET] /orders/${orderId} - will show information about order by order_id
### body: none