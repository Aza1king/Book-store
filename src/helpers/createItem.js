const createItem = (book, item = {}, quantity) => {
    const { total = 0, count = 0 } = item;

    return {
        title: book.title,
        id: book.id,
        total: total + book.price * quantity,
        count: count + quantity,
    };
};

export default createItem;    