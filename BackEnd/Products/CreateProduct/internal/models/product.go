package models

// Product define la estructura del modelo para un producto.
type Product struct {
	ID    string  `json:"id,omitempty"` // ID único (omitido si está vacío)
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}
