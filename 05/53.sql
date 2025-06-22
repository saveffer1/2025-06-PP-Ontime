UPDATE Inventory AS i
SET List_Price = i.List_Price * 1.2
WHERE i.Item_ID IN (
  -- หาสินค้าที่มียอดขายรวม > 200 ในเดือนก่อนหน้า
  SELECT oi.Item_ID
  FROM OrderItem AS oi
  JOIN "Order" AS o
    ON oi.Order_ID = o.Order_ID
  WHERE o.Order_Date 
        >= date_trunc('month', current_date) - INTERVAL '1 month'
    AND o.Order_Date 
        <  date_trunc('month', current_date)
  GROUP BY oi.Item_ID
  HAVING SUM(oi.Quantity) > 200
);
