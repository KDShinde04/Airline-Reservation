namespace AirReservationV1.Services
{
    public interface IRepo<K,T>
    {
        T Add(T item);
        T Get(K key);
        ICollection<T> GetAll();
        T Update(T item);
        T Delete(K key);
    }
}
