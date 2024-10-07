function OverlayForm({ onSubmit, initialValues }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialValues) {
      setContent(initialValues.content);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content });
    if (!initialValues) {
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Overlay content"
      />
      <button type="submit">{initialValues ? 'Update' : 'Add'} Overlay</button>
    </form>
  );
}