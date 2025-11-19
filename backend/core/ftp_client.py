import ftplib
import uuid
from fastapi import UploadFile
from PIL import Image
import io

class FTPClient:
    def __init__(self):
        self.host = "202.92.4.66"  
        self.port = 21
        self.username = "aqczepfrhosting_ftpdev"  
        self.password = "123456aA@"  
        self.ftp_upload_dir = "/" 
        self.web_access_url = "https://sub.shopaccpubgpc.vn/"

    async def optimize_image(self, file: UploadFile) -> tuple[bytes, str]:
        """Tối ưu ảnh: resize + compress + convert WebP"""
        try:

            image_data = await file.read()
            image = Image.open(io.BytesIO(image_data))
            

            image = ImageOps.exif_transpose(image)

            max_size = 1200
            if max(image.size) > max_size:
                image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)

            output = io.BytesIO()
            image.save(output, format='WEBP', quality=80, optimize=True)
            
            return output.getvalue(), 'webp'
            
        except Exception as e:
            print(f" Image optimization error: {e}")
   
            await file.seek(0)
            return await file.read(), file.filename.split('.')[-1]

    async def upload_image(self, file: UploadFile) -> str:
        try:
            print(" Optimizing image...")
            optimized_data, ext = await self.optimize_image(file)
            
            print(" Connecting to FTP...")
            ftp = ftplib.FTP()
            ftp.connect(self.host, self.port)
            ftp.login(self.username, self.password)
            ftp.cwd(self.ftp_upload_dir)
            

            filename = f"img_{uuid.uuid4()}.{ext}"
            print(f" Uploading optimized image: {filename}")
 
            bio = io.BytesIO(optimized_data)
            ftp.storbinary(f"STOR {filename}", bio)
            ftp.quit()
            
            image_url = f"{self.web_access_url}{filename}"
            print(f" Upload successful: {image_url}")
            return image_url
            
        except Exception as e:
            print(f" FTP Upload error: {e}")
            raise e
        





