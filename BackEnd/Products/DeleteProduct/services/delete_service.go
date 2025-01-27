package services

func DeleteProductByID(id string) error {
	return repository.DeleteByID(id)
}
