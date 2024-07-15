using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using BusinessLayer.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Implementations
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobService;
        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobService = blobServiceClient;
        }
        public async Task<string> GetBlob(string blobName, string containerName)
        {
            BlobContainerClient blobContainerClient = _blobService.GetBlobContainerClient(containerName);
            var blobClient = blobContainerClient.GetBlobClient(blobName);
            return blobClient.Uri.AbsoluteUri;
        }
        public async Task<List<string>> GetAllContainers()
        {
            List<string> containerName = new();
            await foreach (BlobContainerItem blobContainerItem in _blobService.GetBlobContainersAsync())
            {
                containerName.Add(blobContainerItem.Name);
            }
            return containerName;
        }
    }
}

