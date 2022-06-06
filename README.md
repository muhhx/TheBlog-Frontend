### Theo Webert Blog - Frontend
const [state, setState] = useState<String>("");
const [loading, setLoading] = useState<Boolean>(true);

useEffect(() => {
    async function fetchData() {
        try {
            const data = await fetch(URL)

            setState(data.message)
        } catch (error) {
            setState(error.message)
        }
        setLoading(false)
    }
    fetchData()
}, []);

<div>
    {loading || state}
</div>

- Enquanto estiver fetchig the data, o UI vai mostrar o loading, depois que fetch, vai mostrar o dado ou erro


-- Redux State
Post {
    posts: [],
    isLoading: null,
    error: null,
    errorMessage: null
}

1. "FETCH_POSTS"

Post {
    posts: [],
    isLoading: true,
    error: null,
    errorMessage: null
}

after fetched:

1. "SUCCESS_POSTS"
Post {
    posts: [{}, {}, {}],
    isLoading: false,
    error: false,
    errorMessage: null
Post }

2. "ERROR_POSTS"
Post {
    posts: [],
    isLoading: false,
    error: true,
    errorMessage: "Mensagem de erro"
}

Componente 1
const Posts = useSelector()

useEffect(() => {
    "FETCH POSTS"
}, [])

return (
    <div>
        {Posts.isLoading ? <LoadingComponent /> : 
            Posts.error ? <ErrorComponent message={Posts.errorMessage} /> : <PostsComponent posts={Post.posts}>
        }
    </div>
)

{
    type: "TYPE"
    payload: String (In case of error) | DataFetched
    error: Boolean | Null (reset Error) ou error: {} error object from the backend
    isLoading: Boolean
}

{
    type: "TYPE",
    payload: DataFetched (error or not)
    isLoading: Boolean
    isError: Boolean
    isSuccess: Boolean
}

{
    type: "TYPE",
    payload: DataFetched,
    status: "idle" | "loading" | "success" | "error"
    error: "Error message"
}