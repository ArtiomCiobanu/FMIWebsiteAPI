﻿using Microsoft.EntityFrameworkCore;
using NewsWebsiteAPI.Infrastructure.Models.Entities;

namespace NewsWebsiteAPI.DataAccess.Context
{
    public class PostContext : DbContext, IPostContext
    {
        public DbSet<Post> Posts { get; set; }

        public PostContext(DbContextOptions<PostContext> options) : base(options)
        {
        }
    }
}