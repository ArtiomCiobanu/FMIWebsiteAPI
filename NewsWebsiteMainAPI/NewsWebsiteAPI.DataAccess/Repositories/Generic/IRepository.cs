﻿using System;
using System.Threading.Tasks;

namespace NewsWebsiteAPI.DataAccess.Repositories.Generic
{
    public interface IRepository<T>
        where T : class
    {
        public Task CreateAsync(T account);
        public Task UpdateAsync(T account);
        public Task<T> GetAsync(Guid id);
    }
}