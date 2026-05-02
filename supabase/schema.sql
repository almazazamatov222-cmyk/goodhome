-- Create profiles table linked to auth.users
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  phone text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric not null,
  old_price numeric,
  image_url text,
  is_new boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

create policy "Products are viewable by everyone."
  on products for select
  using ( true );

create policy "Only admins can insert products."
  on products for insert
  with check ( exists (
    select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'
  ) );

create policy "Only admins can update products."
  on products for update
  using ( exists (
    select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'
  ) );

create policy "Only admins can delete products."
  on products for delete
  using ( exists (
    select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'
  ) );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, phone, role)
  values (new.id, new.phone, 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
