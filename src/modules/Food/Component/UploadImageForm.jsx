export const UploadImageForm = () => {
    return <>
        <div className="form-group">
            <label htmlFor="inputPrice">Code</label>
            {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
            <input
                type="file"
                className="form-control"
                placeholder="image"
            />
        </div>
    </>
}
