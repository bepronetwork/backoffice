
export const export2JSON = (data, filename) => {
      
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {
        type: "text/plain"
    }));

    a.setAttribute("download", `${filename}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}