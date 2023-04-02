function formify (object : Object)
{
    const formData = new FormData();
    Object.entries(object).forEach(([key, value]) => 
    {
        formData.append(key, value)
    })

    return formData;
}

function objectify (formData : FormData)
{
    return Object.fromEntries(formData.entries());
}

export const FormParser = { formify, objectify };