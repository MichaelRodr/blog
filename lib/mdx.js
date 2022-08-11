import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize}  from 'next-mdx-remote'

// ? cacheo del path raiz
const root = process.cwd()

/**
 * ? Llama todos los archivos
 */
export const getFiles = () =>{fs.readdirSync(path.join(root, "data"))}

/**
 * ?Llama los archivos por la ruta del archivo
 */
export const getFileBySlug = async ( slug) => {
  const mdxSource =  fs.readFileSync(path.join(root, "data",  `${slug}.mdx`), "utf8")
 

  const {data,content} =  await matter(mdxSource)
  const source = await serialize(content, {});

  return {
    source,
      readingTime: readingTime(content),
      slug: slug || null,
          ...data,
      }
  }
    
  



export const getAllFilesMetaData = () => {
  const files = fs.readdirSync(path.join(root, "data"))

  return files.reduce((allPosts ,postSlug) =>{
    const mdxSource = fs.readFileSync(path.join(root, 'data', postSlug))
    const {data} = matter(mdxSource)

    return [{...data, slug: postSlug.replace('.mdx', ''), },...allPosts]
  })
}

