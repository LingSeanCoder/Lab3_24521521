# AI Failure Mode Audit — Lab 2

**Sinh viên:** Nguyễn Đình Sang
**Môn:** Web Application Development
**Đối tượng audit:** ChatGPT / GitHub Copilot

---

## Failure #01: Redundant `useEffect` for Derived State
- **Prompt**: "Viết component hiển thị danh sách đã lọc dựa trên từ khóa tìm kiếm."
- **AI Code**: 
  ```jsx
  const [keyword, setKeyword] = useState('');
  const [filtered, setFiltered] = useState(items);
  useEffect(() => {
    setFiltered(items.filter(i => i.name.includes(keyword)));
  }, [keyword, items]);