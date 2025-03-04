import { useEffect, useState } from "react";

interface Item {
    id: number;
    title: string;
    imageUrl: string;
}

const CollectionPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://harvardartmuseums.org/browse?q=&load_amount=12&offset=12`);
                const data = await response.json();
                setItems((prev) => [...prev, ...data.records]);
            } catch (error) {
                console.error("loading error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]);

    return (
        <div>
            <h1>collection</h1>
            <div className="grid">
                {items.map((item) => (
                    <div key={item.id} className="card">
                        <img src={item.imageUrl} alt={item.title} />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
            <button disabled={loading} onClick={() => setPage(page + 1)}>
                {loading ? "loading" : "load more"}
            </button>
        </div>
    );
};

export default CollectionPage;