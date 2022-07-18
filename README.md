# Caro_JavaScrip

## Mô tả bài toán 

```
Xây dựng trò chơi game Caro cơ bản với JavaScrip
+) Nhập tên người chơi.
+) Nhập kích thước bàn cờ.
+) Đổi lượt khi người chơi đi cờ.
+) Có chức năng đi lại.
+) Thông báo tên người chơi chiến thằng.
```

## Lý thuyết 

* Event Loop

```
Event Loop là cơ chế giúp Javascript có thể thực hiện nhiều thao tác cùng một lúc (concurrent model).
Nhiệm vụ của Event Loop rất đơn giản đó là đọc Stack và Event Queue. 
Nếu nhận thấy Stack rỗng nó sẽ nhặt Event đầu tiên trong Event Queue và handler (callback hoặc listener) gắn với Event đó và đẩy vào Stack.
```

* Callback

```
Callback là ta truyền một đoạn code (Hàm A) này vào một đoạn code khác (Hàm B). 
Tới một thời điểm nào đó, Hàm A sẽ được hàm B gọi lại (callback).
```

* This trong JavaScrip

```
This là một từ khóa dùng để trỏ đến đối tượng hiện tại, qua đó ta có thể truy cập đến những phương thức và thuộc tính trong đối tượng đó
```

* Object

```
Object trong JavaScript là một khái niệm trừu tượng dùng để biểu diễn một vật thể (cụ thể). 
Trong đó, các thuộc tính dùng để miêu tả đặc điểm, tính chất của đối tượng.
Về bản chất, object là tập hợp của các key và value. Với key gọi là thuộc tính, còn value là giá trị tương ứng của thuộc tính.

LƯU Ý: 
    * Object có thể không chứa thuộc tính nào, được gọi là object rỗng.
```

* Prototype

```
Prototype là tập hợp những phương thức và thuộc tính nằm trong đối tượng có tên là prototype, và đối tượng này tồn tại trong các object và các object này kế thừa các thuộc tính (properties) cũng như phương thức (methods) từ prototype của mình.
```
